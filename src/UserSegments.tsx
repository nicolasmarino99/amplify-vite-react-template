import type { Schema } from "../amplify/data/resource";

interface UserSegmentsProps {
  userSegments: Array<Schema["UserSegment"]["type"]>;
}

const UserSegments: React.FC<UserSegmentsProps> = ({ userSegments }) => (
  <ul>
    {userSegments.map((segment) => (
      <li key={segment.id}>
        <p>Name: {segment.name}</p>
        <p>Description: {segment.description}</p>
      </li>
    ))}
  </ul>
);

export default UserSegments;
