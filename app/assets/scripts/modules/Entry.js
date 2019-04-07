import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class Entry {
  constructor(trigger, element, className) {
    this.triggerElement = trigger;
    this.bodyElement = element;
    this.createWaypoints(className);
  }

  createWaypoints(className) {
    new Waypoint({
      element: this.triggerElement[0],
      handler: direction => {
        if (direction == "down") {
          this.bodyElement.addClass(className);
        }
      },
      offset: "20%"
    });
  }
}

export default Entry;
