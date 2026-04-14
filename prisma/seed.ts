import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const services = [
    {
      name: 'Genel Bakım (Periyodik)',
      description: 'Motor yağı, yağ filtresi, hava filtresi ve polen filtresi değişimi.',
      price: 1500,
      duration: 60,
    },
    {
      name: 'Fren Balatası Değişimi',
      description: 'Ön ve arka fren balatalarının kontrolü ve değişimi.',
      price: 800,
      duration: 45,
    },
    {
      name: 'Akü Değişimi',
      description: 'Eski akünün ölçümü ve yeni start-stop veya normal akü ile değişimi.',
      price: 1200,
      duration: 20,
    },
    {
      name: 'Detaylı İç ve Dış Temizlik',
      description: 'Araç içi detaylı antibakteriyel temizlik, motor yıkama ve dış cilalama.',
      price: 2500,
      duration: 180,
    }
  ]

  console.log('Veritabanına örnek hizmetler ekleniyor...')
  for (const service of services) {
    await prisma.service.create({
      data: service,
    })
  }

  console.log('Seed işlemi tamamlandı.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
