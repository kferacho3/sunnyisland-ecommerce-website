// EventsPage.tsx
import {
  EventItem,
  floridaEvents,
  georgiaEvents,
} from "../../../data/eventsData";
import ClientEvents from "./ClientEvents";

export default function EventsPage() {
  const now = new Date();

  // Filter out past events and sort upcoming events by date (earliest first)
  const filterAndSort = (events: EventItem[]) =>
    events
      .filter((ev) => new Date(ev.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const upcomingGeorgia = filterAndSort(georgiaEvents);
  const upcomingFlorida = filterAndSort(floridaEvents);

  // Determine the global most upcoming event (from both sections)
  const allUpcoming = [...upcomingGeorgia, ...upcomingFlorida];
  const featuredEvent =
    allUpcoming.length > 0
      ? allUpcoming.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        )[0]
      : null;

  // Combine events (the ClientEvents component will group by normalized theme)
  const allSections = [
    { term: "all", events: [...upcomingGeorgia, ...upcomingFlorida] },
  ];

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(to right, #1f1c2c, #928dab)" }}
    >
      <div className="pt-[130px] pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider">
              Upcoming Events
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover extraordinary culinary experiences and cultural
              celebrations in Georgia and Florida
            </p>
          </div>
          <ClientEvents
            sections={allSections}
            featuredEvent={featuredEvent ?? undefined}
          />
        </div>
      </div>
    </div>
  );
}
