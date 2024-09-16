# Score API Service Specification

Based on the software requirements, the main actions are "event-based"

the features the service will have are:

- User's can sign up / log in
- Perform action to update score
- Get their score
- Get list of top 10 score

Also use an event board cast service like rabbit MQ?


Database schema will be simple;
```sql
CREATE TABLE users (
  id INT SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  score INTEGER DEFAULT 0,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
)
```
Using integer for primary key because it's easier and faster to index, and sort.

The endpoint will support 4 main endpoints;
- Sign ups
- Login
- Update user score (by performing action), returns new score.
- Web sockets or HTTP Polling: To broadcast score changes to all connected clients in real time. Retrieve live top 10 score updates

Scaling & Efficiency
- Use a form of caching strategy for the top 10 users. So once a new score from a user comes - we compare if it's greater than the least of the top 10 score and we update accordingly.
- This cached data (LRU, or Redis, for top 10 users) will be distributed via a CDN for high availability. <---

Accuracy
- Use an event queue to track chronological order of events.
- Only increment score after action has been successfully completed.

Security
- Use jsonwebtoken (or signed session tokens) for auth; as it's stateless.
- Data validation on submitted requests. Putting in mind how often we expect this action to be completed by one user.
- Rate limiting


TODO: High data intense app architecture
Data back up??

- - -

What if we get the last score of the user in the request; as opposed to fetching the db for the user's last score?? Reduce the number of query - we use jwt to make sure the data from the user isn't tampered.

- - -
Assuming the time the validator services uses to validate a work is O(1)
New request -> Load Balancer -> Auth -> Validator Service -> Event Queue (or Bus) -> [DB, Cache]