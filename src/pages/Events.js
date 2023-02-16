import EventsList from "../components/EventsList";
import { useLoaderData, json } from "react-router-dom";

// react router gives us a special hook, which we can use to check the current route transitions state

export default function EventsPage() {
  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }
  const events = data.events;

  return <EventsList events={events} />;
}

// loader function
// Loader executes in the browser

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  // if (!response.ok) {
  // } else {
  //   const resData = await response.json();
  //   // return resData.events;
  //   const res = new Response('any data', {status: 201 });
  //   // This Response() is built into the browser
  // }
  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events." };
    // throw { message: "Could not fetch events." };
    // When an error throw in the loader Something special happens. React router will simply render the closest errorElement

    // throw new Response(JSON.stringify({ message: "Could not fetch events!" }), {
    //   status: 500,
    // });

    // throw only Response object because it does allowed us to include this extra status property, which helps with building generic error handling component

    return json({ message: "Could not fetch events." }, { status: 500 });
  }

  return response;
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
