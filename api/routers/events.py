from typing import List, Union
from fastapi import APIRouter, Depends, Response
from queries.events import (
    Error,
    EventIn,
    EventOut,
    EventRepository
)

router = APIRouter()


@router.post("/api/events", response_model=Union[EventOut, Error])
def create_event(
    event: EventIn,
    response: Response,
    repo: EventRepository = Depends()
):
    '''Create AN instance of an event'''
    new_event = repo.create(event)
    if isinstance(new_event, dict) and new_event.get("code") is not None:
        response.status_code = new_event["code"]
    return new_event


@router.get("/api/events/{event_id}", response_model=Union[EventOut, Error])
def get_one_event(
    event_id: int,
    response: Response,
    repo: EventRepository = Depends()
) -> EventOut:
    '''Get one specific event'''
    event = repo.get_event(event_id)
    if isinstance(event, dict) and event.get("code") is not None:
        response.status_code = event["code"]
    return event


@router.delete("/api/events/{event_id}", response_model=Union[dict, Error])
def delete_event(
    event_id: int,
    response: Response,
    repo: EventRepository = Depends()
) -> dict:
    '''Get one specific event'''
    result = repo.delete(event_id)
    if isinstance(result, dict) and result.get("code"):
        response.status_code = result["code"]
    return result


@router.get("/api/events", response_model=Union[List[EventOut], Error])
def get_events(
    response: Response,
    repo: EventRepository = Depends()
):
    '''Get ALL instances of events in a list response'''
    events = repo.get_all()
    if isinstance(events, dict) and events.get("code") is not None:
        response.status_code = events["code"]
    return events