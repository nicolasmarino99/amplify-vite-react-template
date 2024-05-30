import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

export const useMessages = () => {
  const [messages, setMessages] = useState<Array<Schema["Message"]["type"]>>([]);

  useEffect(() => {
    const subscription = client.models.Message.observeQuery().subscribe({
      next: (data) => setMessages([...data.items]),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const deleteMessage = (id: string) => {
    client.models.Message.delete({ id });
  };

  return { messages, deleteMessage };
};

export const useUserSegments = () => {
  const [userSegments, setUserSegments] = useState<Array<Schema["UserSegment"]["type"]>>([]);

  useEffect(() => {
    const subscription = client.models.UserSegment.observeQuery().subscribe({
      next: (data) => setUserSegments([...data.items]),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { userSegments, setUserSegments };
};
