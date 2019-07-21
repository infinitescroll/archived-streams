### Local development instructions

`git clone git@github.com:openworklabs/streams.git`<br />
`cd streams`<br />
`npm i`<br />

You need to then create a `secrets.js` folder at the top level of the `/src` directory. The secrets file should export the following variables:

```js
export const SLACK_TOKEN = "XXXX";
export const SLACK_CHANNEL_GENERAL = "YYYYY";
export const SLACK_CHANNEL_DAY = "ZZZZZZ";
export const SLACK_CHANNEL_DESIGN = "JJJJJJ";
export const SLACK_CHANNEL_DEV = "MMMMMMM";
export const SLACK_CHANNEL_RANDOM = "NNNNNNN";
export const SLACK_CHANNEL_RESEARCH = "TTTTTTT";

export const TRELLO_TOKEN = "UUUUUUUU";
export const TRELLO_KEY = "IIIIIIIII";

export const DROPBOX_TOKEN = "DDDDDDDD";
```

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Adding Filters

**IMPORTANT** - this will likely change.

Read this section if you want to add your own event filters.

A Streams-filter is a simple object with the following three fields:

`name` - the name of your filter<br />
`callback`- a callback function that takes an event, and returns a boolean. True to include the event in the list, false to filter the event out of the list<br />
`category`- the type (category) of filter to be applied<br />

Right now, the following categories we support are:

`identity` and `application`

##### How are categories used?

Filtering happens within and between categories. Within a category, we use an OR operation to determine event inclusion. For example, within the single `application` category, you may want to view github and trello events at the same time - in this case, we filter by github OR trello.

However, bewteen categories we use an AND operation. For example, you may want to view github events triggered by "schwartz10". In this case, we filter by github AND schwartz10.

So when you are adding a new filter, you can play with what category the filter belongs in to understand how it relates to other filters that are applied at the same time.
