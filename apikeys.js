fetch('postgresql://aarushi:JzvbmcUkHxafJ7xWNkM3Z6jE16xCPi78@dpg-d17bdj15pdvs73865o10-a.oregon-postgres.render.com/hotelandbookings')
  .then(response => response.json())
  .then(data => console.log(data));