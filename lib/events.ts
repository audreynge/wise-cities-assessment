type EventCallback = () => void
type EventName = "cart-updated"

const eventListeners: Record<EventName, EventCallback[]> = {
  "cart-updated": [],
}

export function addEventListener(event: EventName, callback: EventCallback) {
  eventListeners[event].push(callback)

  return () => {
    const index = eventListeners[event].indexOf(callback)
    if (index !== -1) {
      eventListeners[event].splice(index, 1)
    }
  }
}

export function triggerEvent(event: EventName) {
  eventListeners[event].forEach((callback) => callback())
}
