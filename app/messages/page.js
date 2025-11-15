// import { unstable_noStore } from "next/cache"; //no cache  => 3rd way
import Messages from "@/components/messages";
import { getMessages } from "@/lib/messages";

// export const revalidate = 5;
// export const dynamic = "force-dynamic"; //no cache => 2nd way

export default async function MessagesPage() {
  // unstable_noStore();
  // const response = await fetch("http://localhost:8080/messages", {
  //   next: { tag: ["msg"] },
  // });

  // const messages = await response.json();

  const messages = await getMessages();

  // cache: 'force-cache'  //Used by Next 14 by default
  // cache: 'no-store'   //Used by Next 15 by default => 1st way
  // next: {
  //   revalidate: 5, //time in seconds  //refresh the cache data after this time limit
  // },
  // const response = await fetch('http://localhost:8080/messages', {
  //   headers: {
  //     'X-ID': 'page',
  //   },
  // });

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}

/*
By Default, Next Js does Full Route Cache on production. So all the pages become static and refreshes randomly or else after a refresh. So prevent it either use revalidatePath or Force Dynamic (ie No Cache)

Circle symbol => Static page
Lambda symbol => Dynamic page

To prevent data refreshing problem try to use revalidatePath instead of other things, bcuz it only runs after data change is expected to happen.
revalidate => uses time period but is redundant if no data change within that time period
and not caching data is also an disadvantage which will slow down the app.
*/
