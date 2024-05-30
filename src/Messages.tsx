import type { Schema } from "../amplify/data/resource";
import SegmentForm from "./SegmentForm";
import UserSegments from "./UserSegments";
import { Segment } from "./types";

interface MessagesProps {
  messages: Array<Schema["Message"]["type"]>;
  deleteMessage: (id: string) => void;
  userSegments: Array<Schema["UserSegment"]["type"]>;
  onCreateSegment: (segment: Segment) => void;
}

const Messages: React.FC<MessagesProps> = ({
  messages,
  deleteMessage,
  userSegments,
  onCreateSegment,
}) => (
  <>
    <ul>
      {messages.map((message) => (
        <li key={message.id} onClick={() => deleteMessage(message.id)}>
          <h2>{message.title}</h2>
          <p>{message.content}</p>
          <p>Author: {message.author}</p>
          <p>
            User Segment:{" "}
            {
              userSegments.find(
                (segment) => segment.id === message.userSegementID
              )?.name
            }
          </p>
        </li>
      ))}
    </ul>
    <UserSegments userSegments={userSegments} />
    <SegmentForm onSubmit={onCreateSegment} />
  </>
);

export default Messages;
