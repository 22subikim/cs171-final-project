# Life Restarter
--- 
* Team: Kathy Zhong, Subi Kim, Xue (Snow) Bai
* Website URL: https://22subikim.github.io/cs171-final-project/
* Video URL: https://drive.google.com/file/d/1SNFTeIDKHniL-GOReAAddNSdNZuNPdTv/view

## Description
---
According to the CDC, “one of every four deaths in the United States is due to cancer” (https://gis.cdc.gov/Cancer/USCS/#/AtAGlance/).  From relatives to neighbors to friends, cancer has touched the lives of almost everyone around us. Yet despite its omnipresence, there exist many misconceptions surrounding cancer, and informing the public about cancer can increase awareness and encourage practices which reduce their risk of cancer. In fact, according to the WHO, “many cancers can be cured if detected early and treated effectively” (https://www.who.int/news-room/fact-sheets/detail/cancer).

Our project aims to raise awareness about cancer and its onset, providing statistics on its impact, its trends, and its causes. Beyond simple statistics about different types or stages of cancer, we hope to shed light on risk factors, best practices, and courses of action it may benefit people to know and be aware of, in order to help reduce the risk of cancer.

## Project Structure
---
* `css/`
  * `style.css`: custom styles
  * `nouislider.css`: slider style for map visualization
* `data/` 
  * `Prevalence.csv`: age-adjusted prevalence for different measures
  * `SurvivalByStage.csv`: survival rates for different stages of cancer
  * `USCSTrendMap.csv`: cancer age-adjusted rate, case count, population for states (1999-2019) for all types of cancer
  * `data_wrangling.py`: data wrangling for SurvivalByStage.csv
* `image/`: contains icons for website
* `js/`
  * `barVis.js`: code for age 40 visualization
  * `circleVis.js`: code for age 20 visualization
  * `clockVis.js`: clock animation on opening page
  * `lineVis.js`: code for age 10 visualization
  * `main.js`: main file 
  * `mapVis.js`: code for age 0 visualization
  * `matrix2Vis.js`: code for cancer demographics visualization
  * `nouislider.js`: library for slider on map visualization
  * `radarVis.js`: code for age 50 visualization
