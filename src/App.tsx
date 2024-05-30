import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import MessageForm from "./MessageForm";
import { MessageFormData, Segment } from "./types";
import Messages from "./Messages";
import UserSegments from "./UserSegments";
import { useMessages, useUserSegments } from "./hooks";

const client = generateClient<Schema>();

function App() {
  const { messages, deleteMessage } = useMessages();
  const { userSegments, setUserSegments } = useUserSegments();
  const [showForm, setShowForm] = useState<boolean>(false);

  const createMessage = (formData: MessageFormData) => {
    const userSegementID = userSegments.length > 0 ? userSegments[0].id : null;
    client.models.Message.create({ ...formData, userSegementID });
    setShowForm(false);
  };
  const onCreateSegment = (segment: Segment) => {
    client.models.UserSegment.create({ ...segment });
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <button onClick={() => setShowForm(true)}>+ New Message</button>
          {showForm && <MessageForm onSubmit={createMessage} />}
          <Messages
            messages={messages}
            deleteMessage={deleteMessage}
            userSegments={userSegments}
            onCreateSegment={onCreateSegment}
          />
          <UserSegments userSegments={userSegments} />
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
