# Updating the photos on your website

Hi Soniya! This guide shows you how to add and remove project photos on your website yourself. You don't need any special software. Everything happens on the GitHub website, from your computer or your phone.

**Once you save a change, the live website updates by itself within a few minutes.** That's all there is to it.

---

## Before you start

- You need a GitHub account with access to the website. Your developer will send you an invite once; after that you just sign in.
- Your website's photos live here:
  **https://github.com/bhagya099/soniya-interior/tree/main/src/image/rooms**

Bookmark that link. It's the only place you need to go.

---

## Which folder is which room

Inside `rooms` there is one folder per room. Put each photo in the folder for its room:

| Folder           | Shows on the website as |
| ---------------- | ----------------------- |
| `living-room`    | Living Room             |
| `dining-room`    | Dining Room             |
| `kitchen`        | Kitchen                 |
| `bedroom`        | Bedroom                 |
| `kids-bedroom`   | Kids Bedroom            |
| `bathroom`       | Bathroom                |
| `pooja-room`     | Pooja Room              |
| `foyer`          | Foyer                   |
| `home-office`    | Home Office             |
| `balcony-terrace`| Balcony / Terrace       |

A few good things to know:

- **A room appears on the website as soon as its folder has at least one photo.** An empty folder simply isn't shown, so you can fill the Kitchen folder whenever you're ready.
- **Photos are shown in order of their file name**, and the first one is used as the room's cover photo. If you want a particular photo first, give it a name that comes first alphabetically (for example `01-kitchen.jpg`).
- Please don't delete `IMG_0034.jpeg` from `living-room`. It's the big photo at the top of your homepage.
- You'll see a small file called `.gitkeep` in some folders. Just leave it there; it keeps empty folders from disappearing.

---

## Photos straight from your phone are fine

You don't need to resize or edit anything. Upload photos straight from your phone or camera, and the website makes them smaller and faster to load automatically. It also removes hidden location information from the photos.

**iPhone users, one setting first (do this once):**
Open **Settings → Camera → Formats** and choose **Most Compatible**.

This makes your iPhone save photos as normal JPG files. With the other setting ("High Efficiency") iPhones save HEIC files, which the website usually can't use. If you upload one of those, the website won't update and the photo won't appear (see "If something doesn't show up" below).

---

## Adding photos on a computer

1. Open the rooms link above and sign in if GitHub asks you to.
2. Click the folder for the room, for example **`kitchen`**.
3. Near the top right, click **Add file**, then **Upload files**.
4. Drag your photos onto the page, or click **choose your files** to pick them. You can add many at once.
5. Wait until every photo has finished uploading (each one shows a small bar).
6. Scroll down and click the green **Commit changes** button. ("Commit" is just GitHub's word for "save".)

That's it. Your photos will be on the website in a few minutes.

## Deleting a photo on a computer

1. Open the room's folder and click the photo you want to remove.
2. At the top right of the photo, click the **⋯** (three dots) button.
3. Click **Delete file**.
4. Click the green **Commit changes** button, then **Commit changes** again if it asks you to confirm.

The photo will disappear from the website in a few minutes.

---

## Adding photos on a phone

The GitHub app can't upload photos, so use your phone's web browser (Safari or Chrome) instead.

1. Open the rooms link above in your browser and sign in.
2. **Switch to the desktop version of the page.** On a phone, GitHub hides the upload button otherwise.
   - **iPhone (Safari):** tap the **aA** icon in the address bar, then **Request Desktop Website**.
   - **Android (Chrome):** tap the **⋮** menu at the top right and tick **Desktop site**.
3. Tap the folder for the room.
4. Tap **Add file**, then **Upload files**.
5. Tap **choose your files**, then **Photo Library** (iPhone) or **Photos / Gallery** (Android), and select your photos.
6. Wait for them to finish uploading, then scroll down and tap the green **Commit changes** button.

The page will look small on your phone. You can pinch to zoom in.

## Deleting a photo on a phone

1. In your browser, with the **desktop version** switched on (step 2 above), open the room's folder.
2. Tap the photo you want to remove.
3. Tap the **⋯** (three dots) button at the top right of the photo, then **Delete file**.
4. Tap the green **Commit changes** button, then confirm.

---

## If something doesn't show up

- **Give it 5 minutes**, then refresh the website. If it still looks the same, try a private/incognito window, because your browser sometimes shows an old copy.
- **Still not there after 10 minutes?** Usually one photo is in a format the website can't use, most often an iPhone HEIC photo. When this happens, **the website keeps showing the previous version until it's fixed**. Nothing breaks for your visitors.
  - Look in the folder for a file whose name ends in `.heic` or `.heif` (or anything that isn't `.jpg`, `.jpeg` or `.png`).
  - Delete that file (see above), set your iPhone to **Most Compatible**, and upload the photo again.
  - If you can't spot it, message your developer and they'll sort it out quickly.

---

## Things that need your developer

These need a small change behind the scenes, so just send your developer a message:

- **A new type of room** that isn't in the table above (for example "Study Room" or "Walk-in Wardrobe").
- **Renaming a room** or changing the short description shown under it.
- Changing the big homepage photo, your profile photo, the logo, or any text on the website.

Please don't rename or delete the room folders themselves.
