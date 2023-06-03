// Promise in javascript:
// Let there be a promise: I will read 10 pages of a book today. Then there 3 possible outcomes:
// 1. Promise resolved
// 2. Promise rejected
// 3. Promise pending 

function updateMap() {
    console.log("Map updated");
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            // console.log(rsp.data);
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;
                cases = element.infected;

                if (cases < 50) {
                    color = "rgb(191,255,0)"

                }
                else if (cases < 100) {
                    color = "rgb(255,255,0)"
                }
                else if (cases < 150) {

                    color = "rgb(255,128,0)"
                }
                else if (cases < 200) {

                    color = "rgb(255,64,0)"
                }
                else {
                    color = "rgb(255,0,0)"
                }

                // create the popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                    `Infected: ${element.infected}\nRecovered: ${element.recovered}\nSick: ${element.sick}\nDead: ${element.dead}`
                    // 'Construction on the Washington Monument began in 1848.'
                );

                // create DOM element for the marker
                const el = document.createElement('div');
                el.id = 'marker';

                // Mark on the map
                const marker = new mapboxgl.Marker({
                    draggable: false,
                    color: color
                })
                    .setLngLat([longitude, latitude])
                    .setPopup(popup)
                    .addTo(map);
            });
        })
}

updateMap();
setInterval(updateMap, 20000); // updates after every 20 seconds