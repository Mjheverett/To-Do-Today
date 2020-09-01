<h1>TO-DO TODAY<h1>
<img src="images/Main-page.png">

<h2><u>Overview:</u><h2>
<p>To-Do Today provides information about local events that are happening when you use it; Today! With information about weather, concerts, festivals, sporting events, breweries and more, To-Do Today provides plenty of options to find something to-do.</p>
<br>
    
<h2><u>The Team:</u></h2>
<h3>Dylan Cooper: https://github.com/Dcooper15</h3>
</br>
<p><b>Primary team role:</b></p>
<br>
<p><b>Contributions:</b></p>
</br>
<h3>Matthew Everett: https://github.com/Mjheverett</h3>
</br>
<p><b>Primary team role:</b> Javascript</p>
<br>
<p><b>Contributions:</b> API Integrations</p>
</br>
<h3>Justin Gardner: https://github.com/JustinSGardner</h3>
</br>
<b>Primary team role:</b> Add.......
<br>
<b>Contributions:</b> Add.......
<br>
<h3>Harmony Trevena: https://github.com/harmonytrevena</h3>
</br>
<p><b>Primary team role:</b>HTML, CSS and Javascript</p>
<br>
<p><b>Contributions:</b>UI/UX and Responsive Design</p>
<br>

<h2><u>What We Used:</u></h2>
<h3>Languages:</h3>
<ul>
    <li>HTML5</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>JSON</li>
</ul>
<br>
<h3>Frameworks:</h3>
<ul>
    <li>Bulma</li>
</ul>
<br>
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
    <li>Provide Weather and Local Events</li>
    <li>Select from Listed Cities (DigitalCrafts Campus Cities)</li>
    <li>Mobile-first Development</li>
    <li>Category Selections</li>
    <li>Useful and Informative</li>
</ul>
<br>

<h2><u>Stretch Goals Completed:</u></h2>
<ul>
    <li>Clickable Links for Additional Information</li>
    <li>Focused Recommendations</li>
</ul>
<br>
<h2><u>Stretch Goals Future:</u></h2>
<ul>
    <li>Additional Preferences Selections</li>
    <li>Additional Information Displayed</li>
    <ul>
        <li>Images from Location</li>
        <li>Operating Hours</li>
    </ul>
    <li>Additional Cities</li>
</ul>
<br>

<h2><u>Challenges & Solutions:</u><h2>
<h3>Some of the biggest challenges we faced with this project build included:</h2>
<br>
<p><b>Challenge:</b> Display events from a variety of sources and categories in an unbiased manner.</p>
<br>
<p><b>Solution:</b> All events are aggreagted by a Promise.All call and combined into a single 'events' array. The array is sorted randomly and then sent to create the HTML elements from the sorted elements.</p>
<br>
<p><b>Challenge:</b> Enable category selection to expand/narrow choices for events types.</p>
<br>
<p><b>Solution:</b> Enabling API calls based on the category selection prevents the API from being called if the category is not selected. This both helps to narrow data, but also removed the necessity of adding Filters to the page for the initial product.</p>
<br>
    
<h2><u>Code Snippets:</u></h2>

<h4>Add</h4>

<h2>Live Demo</h2>
<a href="https://to-do-today.netlify.app/">To-Do Today</a>
</br>
