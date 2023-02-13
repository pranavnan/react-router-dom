import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";

export default function EventsPage() {
  const events = useLoaderData();

  return <EventsList events={events} />;
}

// import EventsList from "../components/EventsList";
// import { useLoaderData } from "react-router-dom";

// export default function EventsPage() {
//   const events = useLoaderData();

//   return <EventsList events={events} />;
// }

// import { useEffect, useState } from "react";

// import EventsList from "../components/EventsList";

// function EventsPage() {
//   // const [isLoading, setIsLoading] = useState(false);
//   // const [fetchedEvents, setFetchedEvents] = useState();
//   // const [error, setError] = useState();

//   // useEffect(() => {
//   //   async function fetchEvents() {
//   //     setIsLoading(true);

//   //     setIsLoading(false);
//   //   }

//   //   fetchEvents();
//   // }, []);

//   return (
//     <>
//       {/* <div style={{ textAlign: "center" }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div> */}
//       <EventsList events={fetchedEvents} />
//     </>
//   );
// }

// import React from "react";
// import { Link } from "react-router-dom";

// const DUMMY_EVENTS = [
//   { id: "e1", title: "Some Event" },
//   { id: "e2", title: "Some Another Event" },
// ];

// function EventsPage() {
//   return (
//     <div>
//       EventsPage
//       <ul>
//         {DUMMY_EVENTS.map((event) => {
//           return (
//             <li key={event.id}>
//               <Link to={`${event.id}`}>{event.title}</Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default EventsPage;
