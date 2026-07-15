# Security Model

RBank používá "Zero Trust" model mezi frontendem a backendem.
- Frontend (React) je považován za nedůvěryhodné prostředí (lze modifikovat).
- Backend (Node.js) striktně validuje každý příchozí parametr.
