import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';


const EventsPage = ({events}) => {
    const router = useRouter();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    };

    return (
        <Fragment>
            <Head>
              <title>All events</title>
              <meta name='description' content='All events' />
            </Head>
            <EventSearch onSearch={findEventsHandler}/>
            <EventList items={events} />
        </Fragment>
    );
};

export const getStaticProps = async () => {
    const events = await getAllEvents();
    return {
      props: {
        events: events
      },
      revalidate: 60
    }
  };

export default EventsPage;
