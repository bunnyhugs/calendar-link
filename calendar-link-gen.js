function ready(callback) {
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function() {
        if (document.readyState=='complete') callback();
    });
}

ready(function() {
	const calendarLinkElements = document.querySelectorAll("[data-calendar-title]");
			calendarLinkElements.forEach(link => {
				let title = link.getAttribute("data-calendar-title");
				let start = link.getAttribute("data-calendar-start");
				let end = link.getAttribute("data-calendar-end");
				let duration = link.getAttribute("data-calendar-duration");
				let linkText = link.getAttribute("data-calendar-linktext");
				let description = link.getAttribute("data-calendar-description");
				let location = link.getAttribute("data-calendar-location");
				let url  = link.getAttribute("data-calendar-link");
				let allDay  = link.getAttribute("data-calendar-allday");
				
				description = description.replace('{URLLink}', '<a href="' + url + '">' + linkText + '</a>');
				location = location.replace("{URL}", url);
				
				let event = {
					title: title,
					start: start,
					end: end,
					allDay: allDay,
					duration: [duration, "hour"],
					link: url,
					linkText: linkText,
					description: description,
					location: location,
					busy: true,
					guests: [
					]
				};

				let eventLinks = "<ul><li style=\"display: inline-block;\">" + title + "</li>";
				eventLinks += "<li style=\"display: inline-block;\"><a href=\"" + calendarLink.google(event) + "\" target=\"_blank\">Google</a></li>";
				eventLinks += "<li style=\"display: inline-block;\"><a href=\"" + calendarLink.office365(event) + "\" target=\"_blank\">Office365</a></li>";
				eventLinks += "<li style=\"display: inline-block;\"><a href=\"" + calendarLink.outlook(event) + "\" target=\"_blank\">Outlook</a></li>";
				eventLinks += "<li style=\"display: inline-block;\"><a href=\"" + calendarLink.ics(event) + "\" target=\"_blank\">iCal</a></li>";
				eventLinks += "</ul>";
				
				link.innerHTML = eventLinks;
			});
});

