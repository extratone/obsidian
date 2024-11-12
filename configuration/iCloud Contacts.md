# Configuration

### Excluded Keys

```
n photo prodid rev uid version xAbadr xAbLabel xAblabel xAbShowAs xImagehash xImagetype xSharedPhotoDisplayPref xAddressingGrammar xAppleSubadministrativearea xAppleSublocality vnd63SensitiveContentConfig
```


# Documentation

![[example_contact_file.png]]

## Features

-   Sync chttps://github.com/Trulsaa/obsidian-icloud-contacts/blob/main/images/example_contact_file.png?raw=trueontacts from your iCloud to Obsidian
-   Creates a file for each contact with properties corresponding to contact details.
-   This plugin only updates the properties, the title and the top H1 header (the name). Any further info written in the files will not be touched when updating the contact.
-   You can add your own properties to the frontmatter. The plugin will only manage the following property keys: name, organization, departement, telephone, email, url, related names, instant message, social profile, date, birthday pluss any of the kays you remove from the excluded keys setting.

## How to use

1. Install this plugin
2. Add username and app specific password to the settings.
3. Run the command `iCloud contacts: Update contacts` to sync your contacts
4. After syncing is complete, you will see a notification stating how many Contacts have been synced.

Now that you have a folder with all your contacts you can link all your projects to their participants. All your vacation plans to your travel partners. All your meeting notes to the participants.

In addition, you can for example use the [dataview plugin](https://blacksmithgu.github.io/obsidian-dataview/) to display a table with email and phone number for all the contacts you have referenced in the current file like this.

````markdown
```dataview
TABLE email, telephone
FROM outgoing([[#]])
WHERE iCloudVCard
```
````

And you can add this to you daily notes template. Given that the title of your daily notes are formatted like YYYY-MM-DD. Then this will create a list of all your contacts who has a birthday on that day.

````markdown
```dataview
LIST
FROM "Contacts"
WHERE birthday.day = number(split(this.file.name, "-")[2]) AND birthday.month = number(split(this.file.name, "-")[1])
```
````

## Commands

This plugin provides two commands. Use the command pallet to search for **iCloud contacts** and use one of the two commands to update your contacts folder.

1. **Update Contacts**: Downloads all contacts from iCloud and updates the contacts files in you vault that based what contacts have been updated in iCloud.
2. **Update all Contacts**: - Downloads alle contacts form iCloud and rewrites all contacts files in your vault based on the contacts from iCloud. Usefull for when you have changed the Excluded keys setting.

## Notes

-   The **iCloudVCard** property is used to update contacts that have been changed. I also like it as a backup of my contacts in my vault.
-   This plugin is not affiliated with Apple in any way.

## Thanks

The IcloudClient in this codebase is copied and adapted from [tsdav](https://github.com/natelindev/tsdav).

## Support

If you want to support me and my work, you can [bye me a coffee](https://www.buymeacoffee.com/truls).

<img src="images/bmc_qr.png" alt="drawing" width="200"/>