import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getAllEvents } from '../../data/dummy-data';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';


const EventsPage = () => {
    const router = useRouter();
    const events = getAllEvents();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    };

    return (
        <Fragment>
            <EventSearch onSearch={findEventsHandler}/>
            <EventList items={events} />
        </Fragment>
    );
};

export default EventsPage;