import Button from '../ui/button';
import Image from 'next/image';
import classes from './event-item.module.css';
import DateIcon from '../icons/date-icon';
import AddresIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

const EventItem = (props) => {
    const  {title, image, date, location, id} = props;
    const readableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const formatAddress = location.replace(', ', '\n');
    const exploreLink = `/events/${id}`;

    return (
        <li className={classes.item}>
            <Image src={`/${image}`} alt='' width={300} height={300} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{readableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddresIcon />
                        <address>{formatAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    );
};

export default EventItem;
