import { Queue } from "@forge/events";

const eventQueue: Queue = new Queue({ key: "issue-created-queue" });

export async function handleIssueCreated(event, context) {
    await eventQueue.push(event.issue.id);
}