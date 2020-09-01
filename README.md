<h1>TO-DO TODAY<h1>

<img src="images/Main-page.png">
<br>
<br>

<h2><u>Overview:</u><h2>
To-Do Today provides information about local events that are happening when you use it; Today! With information about weather, concerts, festivals, sporting events, breweries and more, To-Do Today provides plenty of options to find something to-do.

<br>

<h2><u>The Team:</u></h2>

<h3>Dylan Cooper: https://github.com/Dcooper15</h3>
<b>Primary team role:</b> Ad........
<br>
<b>Contributions:</b> Add...........

<h3>Matthew Everett: https://github.com/Mjheverett</h3>
<b>Primary team role:</b> Javascript
<br>
<b>Contributions:</b> API Integrations

<h3>Justin Gardner: https://github.com/JustinSGardner</h3>
<b>Primary team role:</b> Add.......
<br>
<b>Contributions:</b> Add.......

<h3>Harmony Trevena: https://github.com/harmonytrevena</h3>
<b>Primary team role:</b> Add.......
<br>
<b>Contributions:</b> Add.......

<br>
<br>
<h2><u>What we used:</u></h2>
<h3>Languages:</h3>
<ul>
    <li>HTML5</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>JSON</li>
</ul>

<h3>Frameworks:</h3>
<ul>
    <li>Bulma</li>
</ul>

<h3>APIs:</h3>
<ul>
    <li><a href="https://www.openbrewerydb.org/">OpenBreweryDB</a></li>
    <li><a href="https://openweathermap.org/">OpenWeatherMap</a></li>
    <li><a href="https://www.predicthq.com/">PredictHQ</a></li>
    <li><a href="https://developer.ticketmaster.com/">TicketMaster</a></li>
    <li><a href="https://developers.zomato.com/">Zomato</a></li>
</ul>

<br>

<h2><u>MVP (Minimum Viable Product):</u></h2>
<ul>
    <li>Provide weather and local events</li>
    <li>Select from listed cities (DigitalCrafts cities)</li>
    <li>Mobile-first development</li>
    <li>Category selections</li>
    <li>Useful and informative</li>
</ul>
<br>
<h2><u>Stretch Goals Completed</u></h2>
<ul>
    <li>Clickable links for additional information</li>
    <li>Focused recommendations</li>
</ul>
<br>
<h2><u>Stretch Goals Future</u></h2>
<ul>
    <li>Additional preferences selections</li>
    <li>Additional information displayed</li>
    <ul>
        <li>Images from location</li>
        <li>Operating hours</li>
    </ul>
    <li>Additional cities</li>
</ul>
<br>
<h2><u>Challenges & Solutions:</u><h2>
<h3>Some of the biggest challenges we faced with this project build included:</h2>
<br>
<p><b>Challenge:</b> Display events from a variety of sources and categories in an unbiased manner.</p>
<p><b>Solution:</b> All events are aggreagted by a Promise.All call and combined into a single 'events' array. The array is sorted randomly and then sent to create the HTML elements from the sorted elements.</p>
<p><b>Challenge:</b> Enable category selection to expand/narrow choices for events types.</p>
<p><b>Solution:</b> Enabling API calls based on the category selection prevents the API from being called if the category is not selected. This both helps to narrow data, but also removed the necessity of adding Filters to the page for the initial product.</p>
<p><b>Challenge:</b> Add </p>
<p><b>Solution:</b> Add </p>

<h2><u>Code Snippets:</u></h2>

<h4>Add</h4>


<h2>Live Demo</h2>
<a href="https://to-do-today.netlify.app/">To-Do Today</a>
</br>

<h2>Screenshots:</h2>

<h4>Sub-heading</h4>
