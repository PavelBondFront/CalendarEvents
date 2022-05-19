import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import './App.css';

import {
    Eventcalendar,
    localeRuUA,
    toast,
    setOptions,
    SegmentedGroup,
    SegmentedItem,
} from '@mobiscroll/react';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

function App() {
    const [selected, setSelected] = React.useState({1: true});
    const [events, setEvents] = React.useState([]);
    const [filteredEvents, setFilteredEvents] = React.useState([]);
    const now = new Date();

    const calView = React.useMemo(() => {
        return {
            calendar: {
                labels: true,
                size: 6,
                popover: true,
            },
        };
    }, []);


    const myResources = React.useMemo(() => {
        return [{
            id: 1,
            name: 'Встреча с экспертом',
            color: '#328e39',
            checked: true,
        },
            {
                id: 2,
                name: 'Вопрос-ответ',
                color: '#00aabb',
                checked: false,
            },
            {
                id: 3,
                name: 'Конференция',
                color: '#ea72c0',
                checked: false,
            },
            {
                id: 4,
                name: 'Вебинар',
                color: '#000000',
                checked: false,
            },
        ]
    }, []);

    const MyEvents = [
        {
            start: new Date(2022, 5, 18, 8, 0),
            end: new Date(2022, 5, 18, 17, 0),
            title: 'Встреча с экспертом Андреем',
            resource: 1
        },
        {
            start: new Date(2022, 2, 18, 20, 0),
            end: new Date(2022, 2, 18, 22, 0),
            title: 'Встреча с экспертом Андреем',
            resource: 1
        },
        {
            start: new Date(2022, 1, 20),
            title: 'Вопрос ответ 1',
            resource: 2
        },
        {
            start: new Date(2022, 2, 1),
            title: 'Конференция по SEO',
            resource: 3
        },
        {
            start: new Date(2022, 4, 2),
            title: 'Вебинар по js',
            resource: 4
        },
    ]

    React.useEffect(() => {
        setEvents(MyEvents);
        filterEvents(MyEvents, selected);

    }, []);

    const filterEvents = (events, selected) => {
        let evs = [];
        for (let i = 0; i < events.length; ++i) {
            const item = events[i];
            if (selected[item.resource]) {
                evs.push(item);
            }
        }
        setFilteredEvents(evs);
    }

    const onEventClick = React.useCallback((event) => {
        toast({
            message: event.event.title
        });
    }, []);

    const filter = (ev) => {
        const value = ev.target.value;
        const checked = ev.target.checked;

        selected[value] = checked;

        setSelected(selected)

        filterEvents(events, selected);

        toast({
            message: (checked ? 'Выбранное событие: ' : 'Скрыто: ') + document.querySelector('.md-header-filter-name-' + value).textContent
        });
    }

    const customWithNavButtons = () => {
        return <React.Fragment>
            <div className="md-header-filter-controls">
                <SegmentedGroup select="multiple">
                    {myResources.map((res) => {
                        return <SegmentedItem key={res.id} value={res.id} checked={selected[res.id]} onChange={filter}>
                            <span className={'md-header-filter-name md-header-filter-name-' + res.id}>{res.name}</span>
                        </SegmentedItem>
                    })}
                </SegmentedGroup>
            </div>
        </React.Fragment>;
    }

    return (
        <Eventcalendar
            renderHeader={customWithNavButtons}
            view={calView}
            locale={localeRuUA}
            resources={myResources}
            data={filteredEvents}
            onEventClick={onEventClick}
            cssClass="md-custom-header-filtering"
        />
    );
}


export default App;
