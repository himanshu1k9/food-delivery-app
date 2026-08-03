class SseManager { // SSE - Server Send Event
    constructor() {
        this.clients = {};  // Stores response objects grouped by orderId
    }

    subscribe(orderId, res) {
        if (!this.clients[orderId]) {
            this.clients[orderId] = [];
        }
        this.clients[orderId].push(res);
        // Log connection for observability
        console.log(`Client subscribed to Order: ${orderId}. Total: ${this.clients[orderId].length}`);

        // Remove client on connection close
        res.on('close', () => {
            this.clients[orderId] = this.clients[orderId].filter(client => client !== res);
            console.log(`Client disconnected from Order: ${orderId}`);
        });
    }

    // Send update to all clients watching a specific order
    publishStatusUpdate(orderId, status) {
        const subscribers = this.clients[orderId];
        if (subscribers && subscribers.length > 0) {
            console.log(`Publishing real-time update for Order: ${orderId}, Status: ${status}`);
            subscribers.forEach(res => {
                // SSE standard format: "data: <message>\n\n"
                res.write(`data: ${JSON.stringify({ status })}\n\n`);
            });
        }
    }
}

module.exports = new SseManager(); // Singleton