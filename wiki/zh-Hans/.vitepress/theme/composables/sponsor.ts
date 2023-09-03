import { ref, onMounted } from 'vue'

interface Sponsors {
  special: Sponsor[]
  platinum: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
}

interface Sponsor {
  name: string
  img: string
  url: string
}

// shared data across instances so we load only once.
const data = ref()

const dataHost = 'https://cdn.fresns.cn'
const dataUrl = `${dataHost}/sponsor/sponsors.json`

export function useSponsor() {
  onMounted(async () => {
    if (data.value) {
      return
    }

    const result = await fetch(dataUrl)
    const json = await result.json()

    data.value = mapSponsors(json)
  })

  return {
    data
  }
}

function mapSponsors(sponsors: Sponsors) {
  return [
    {
      tier: '特别赞助商',
      size: 'big',
      items: mapImgPath(sponsors['special'])
    },
    {
      tier: '铂金赞助商',
      size: 'big',
      items: mapImgPath(sponsors['platinum']),
    },
    {
      tier: '金牌赞助商',
      size: 'medium',
      items: mapImgPath(sponsors['gold'])
    }
  ]
}

function mapImgPath(sponsors: Sponsor[]) {
  return sponsors.map((sponsor) => ({
    ...sponsor,
    img: `${dataHost}/sponsor/images/${sponsor.img}`
  }))
}
