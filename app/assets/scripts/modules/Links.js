import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";
import smoothScroll from "jquery-smooth-scroll";

class Links {
  constructor() {
    this.navbar = $(".navbar");
    this.navbarHr = $(".navbar__hr");
    this.headerTriggerElement = $("#start");

    this.pageSections = $(".page-section");
    this.navbarLinks = $(".page-section__next a");
    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
  }

  addSmoothScrolling() {
    this.navbarLinks.smoothScroll();
  }

  createPageSectionWaypoints() {
    const that = this;
    this.pageSections.each(function() {
      const currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: direction => {
          if (direction == "down") {
            const matchingNavbarLink = currentPageSection.getAttribute(
              "data-matching-link"
            );
            that.navbarLinks.removeClass("is-current-link");
            $(matchingNavbarLink).addClass("is-current-link");
          }
        },
        offset: "18%"
      });

      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction == "up") {
            const matchingNavbarLink = currentPageSection.getAttribute(
              "data-matching-link"
            );
            that.navbarLinks.removeClass("is-current-link");
            $(matchingNavbarLink).addClass("is-current-link");
          }
        },
        offset: "-40%"
      });
    });
  }
}

export default Links;
