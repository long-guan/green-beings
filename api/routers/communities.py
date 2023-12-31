from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.communities import (
    Error,
    CommunityIn,
    CommunityOut,
    CommunityRepository,
    CommunityListOut,
)
from authenticator import authenticator

router = APIRouter()


@router.post("/api/communities", response_model=Union[CommunityOut, Error])
async def create_community(
    community: CommunityIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CommunityRepository = Depends()
):
    '''Create an instance of community'''
    community = repo.create_community(community)
    if isinstance(community, dict) and community.get('message') is not None:
        response.status_code = 404
    return community


@router.get("/api/communities/{community_id}", response_model=Union[CommunityOut, Error])
def get_community(
    community_id: int,
    response: Response,
    repo: CommunityRepository = Depends()
):
    '''Get a single instance of a community'''
    community = repo.get_community(community_id)
    if isinstance(community, dict) and community.get('message') is not None:
        response.status_code = 404
    return community


@router.get("/api/communities", response_model=Union[List[CommunityOut], Error])
def get_communities(
    repo: CommunityRepository = Depends()
):
    '''Get a list of all community instances'''
    return repo.get_communities()


@router.delete("/api/communities/{community_id}", response_model=Union[bool, Error])
async def delete_community(
    community_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CommunityRepository = Depends()
):
    '''Delete a single instance of a community'''
    community = repo.get_community(community_id)
    if isinstance(community, dict) and community.get('message') is not None:
        response.status_code = 404
        return {"message": "Invalid Id - Could not delete Community"}
    else:
        repo.delete_community(community_id)
        return {"message": "Community deleted successfully"}


@router.get("/api/communities/user/{user_id}", response_model=Union[CommunityListOut, Error])
async def get_communities_user_in(
    user_id: int,
    response: Response,
    repo: CommunityRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        results = repo.get_communities_user_in(user_id)
        return {"communities": results}
    except Exception:
        response.status_code = 503
        return {"message": "Data server is down"}
