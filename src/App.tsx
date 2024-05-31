import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import MessageForm from "./MessageForm";
import { MessageFormData, Segment } from "./types";
import Messages from "./Messages";
import { useMessages, useUserSegments } from "./hooks";

const client = generateClient<Schema>();

function App() {
  const { messages, deleteMessage } = useMessages();
  const { userSegments, setUserSegments } = useUserSegments();
  const [showForm, setShowForm] = useState<boolean>(false);

  const createMessage = (formData: MessageFormData) => {
    client.models.Message.create({ ...formData });
    setShowForm(false);
  };
  const onCreateSegment = (messageID: string) => (segment: Segment) => {
    segment.messageID = messageID;
    client.models.UserSegment.create({
      ...segment,
    });
    setUserSegments((prevSegments) => [...prevSegments, segment]);
    console.log(userSegments);
  };
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Welcome {user?.signInDetails?.loginId?.split("@")[0]}!</h1>
          <button onClick={() => setShowForm((prev) => !prev)}>
            + New Message
          </button>
          {showForm && <MessageForm onSubmit={createMessage} />}
          <Messages
            messages={messages}
            deleteMessage={deleteMessage}
            userSegments={userSegments}
            onCreateSegment={onCreateSegment}
          />
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
