#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create styles
  const styles = [
    {
      name: 'Moderno',
      slug: 'moderno',
      description: 'Linee pulite, materiali innovativi, minimalismo funzionale',
      colors: ['#000000', '#FFFFFF', '#808080', '#FF6B6B'],
      keywords: ['clean', 'minimal', 'geometric'],
      image: '/styles/moderno.jpg',
      priority: 1,
    },
    {
      name: 'Scandinavo',
      slug: 'scandinavo',
      description: 'Luminosità, legno chiaro, biancheria naturale',
      colors: ['#FFFFFF', '#E8E8E8', '#D2B48C', '#36454F'],
      keywords: ['light', 'natural', 'functional'],
      image: '/styles/scandinavo.jpg',
      priority: 2,
    },
    {
      name: 'Industriale',
      slug: 'industriale',
      description: 'Mattoni, metallo, cemento, materiali grezzi',
      colors: ['#4A4A4A', '#8B4513', '#C0A080', '#2C1810'],
      keywords: ['raw', 'metal', 'exposed'],
      image: '/styles/industriale.jpg',
      priority: 3,
    },
  ]

  for (const style of styles) {
    await prisma.style.upsert({
      where: { slug: style.slug },
      update: {},
      create: style,
    })
  }

  // Create diagnostic questions
  const questions = [
    {
      question: 'Qual è la tua palette di colori preferita?',
      type: 'multiple-choice',
      options: JSON.stringify([
        { label: 'Neutri', value: 'neutral' },
        { label: 'Caldi', value: 'warm' },
      ]),
      order: 1,
    },
    {
      question: 'Preferisci moderno o tradizionale?',
      type: 'slider',
      options: null,
      order: 2,
    },
  ]

  for (const question of questions) {
    await prisma.diagnosticQuestion.upsert({
      where: { id: question.question },
      update: {},
      create: { ...question, id: undefined },
    })
  }

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
