# [Uncharted-Limbo-Collective.github.io](https://uncharted-limbo-collective.github.io/)
![](assets/img/Official%20Logo%2002_main_logo.svg)

## How To

### I am a member of UL Collective and I have an experiment I want to add to our webpage. How?
* Go to this [.json file](https://github.com/Uncharted-Limbo-Collective/Uncharted-Limbo-Collective.github.io/blob/main/assets/experiment-list.json)
* Add a new entry. An entry looks like this:
```json
 "my-new-project": {
    "name": "My New Project",
    "longName": "Epic Projects I: My New Project",
    "artist": "Great Artist",
    "thumbnail": "assets/img/experiments/thumbnails/slov-16.png",
    "video": "https://player.vimeo.com/video/328643073?color=ffffff&byline=0&portrait=0",
    "squareVideo": false,
    "text": [
      {
        "paragraph" :"Volumetric Reaction Diffusion inside a 3d-scanned model of a miniature lion."
      },
      {
        "paragraph" :"A new paragraph of text."
      },
    ],
    "images": [
      {
      "src":"assets/img/some-image.png"
      },
      {
      "src":"assets/img/some-other-image.png"
      }
    ]
  },

```
* If you don't have images or text to add, set `"text":[]` and/or `"images":[]`, or omit them entirely.
* If you don't have video, please consider making one :) 
* Thumbnails should be ideally 768 x 768 square images.
* Please put thumbnails for experiments in the `assets/img/experiments/thumbnails/` folder, just to keep thigs clean.
* If your video happens to be square, please set `"squareVideo": true`
