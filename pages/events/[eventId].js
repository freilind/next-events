import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getEventById } from '../../data/dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/error-alert/error-alert';

const EventDetailPage = () => {
    const router = useRouter();
    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if(!event) {
        return (
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        );
    }

    return(
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.imageAlt}/>
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
};

export default EventDetailPage;