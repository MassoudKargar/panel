import React, { useState, useEffect } from 'react'
import { useParams, useNavigator } from 'next/navigation'
import { getFeaturedRepositories } from '@/lib/repos'

const ExperienceSection = () => {
  const { id } = useParams()
  const navigator = useNavigator()
  const [experienceItems, setExperienceItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const repos = await getFeaturedRepositories()
        setExperienceItems(repos)
      } catch (error) {
        console.error('Failed to load experience:', error)
      } finally {
        setLoading(false)
      }
    }
    loadExperience()
  }, [id])

  const handleSelect = (item) => {
    setSelectedItem(item)
  }

  if (loading) {
    return <div className="p-8">Loading experience...</div>
  }

  if (!selectedItem) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Your Expertise</h2>
        <p className="text-gray-600">Select a project to view your expertise area</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Experience Areas</h2>
      
      {experienceItems.length > 0 ? (
        experienceItems.map(item => (
          <div key={item.id} className="mb-6 p-4 border rounded-lg hover:shadow-md transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex-shrink-0">
                {item.category.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.period}</span>
                  <span className="text-sm font-medium text-gray-700">{item.period}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-8">No experience areas selected.</p>
      )}
    </div>
  )
}

export default ExperienceSection