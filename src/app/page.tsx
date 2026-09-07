import { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { AboutSection } from '@/components/home/AboutSection'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { TechStack } from '@/components/home/TechStack'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { FeaturedPosts } from '@/components/home/FeaturedPosts'
import { GitHubStats } from '@/components/home/GitHubStats'
import { CurrentlyExploring } from '@/components/home/CurrentlyExploring'
import { CTASection } from '@/components/home/CTASection'
import { PersonnelChat } from '@/components/personnel/PersonnelChat'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.description,
}

export default async function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <TechStack />
      <FeaturedProjects />
      <FeaturedPosts />
      <GitHubStats />
      <CurrentlyExploring />
      <PersonnelChat />
      <CTASection />
    </>
  )
}