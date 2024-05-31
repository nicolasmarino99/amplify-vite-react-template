import { Segment } from "./types";

interface UserSegmentsProps {
  userSegments: Array<Segment>;
}

const UserSegments: React.FC<UserSegmentsProps> = ({ userSegments }) => (
  <ul>
    {userSegments.map((segment, i) => (
      <li key={i}>
        <p>Name: {segment.name}</p>
        <p>Description: {segment.description}</p>
      </li>
    ))}
  </ul>
);

export default UserSegments;
