import React, { useState } from 'react'
import { Lightbulb } from 'lucide-react'

interface ContributionData {
  date: string
  contributions: number
}

export function GitHubContributionChart() {
  // Sample contribution data - in a real app this would come from GitHub API
  const contributionData: ContributionData[] = [
    { date: '2023-01', contributions: 45 },
    { date: '2023-02', contributions: 62 },
    { date: '2023-03', contributions: 38 },
    { date: '2023-04', contributions: 75 },
    { date: '2023-05', contributions: 52 },
    { date: '2023-06', contributions: 88 },
    { date: '2023-07', contributions: 64 },
    { date: '2023-08', contributions: 91 },
    { date: '2023-09', contributions: 73 },
    { date: '2023-10', contributions: 85 },
    { date: '2023-11', contributions: 94 },
    { date: '2023-12', contributions: 102 },
  ]

  const [data, setData] = useState<ContributionData[]>(contributionData)
  const width = 300
  const height = 200

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          GitHub Contribution Activity
        </h2>
        
        <div className="flex-1">
          {/* Simplified static chart visualization */}
          <div className="relative h-[200px]">
            {/* Horizontal axis labels */}
            {[1, 4, 7, 10, 12].map((index) => (
              <div
                key={index}
                className="text-xs text-muted-foreground absolute bottom-1 left-0 right-0"
              >
                {index <= data.length ? data[index - 1].date : ''}
              </div>
            ))}

            {/* Vertical axis markers and labels */}
            {[0, 25, 50, 75, 100].map((label) => (
              <div
                key={label}
                className="absolute left-1 text-xs text-gray-400"
              >
                <span className="text-xxs ml-1">{label}</span>
              </div>
            ))}

            {/* Simulated contribution bars */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((monthIndex) => {
              const month = 13 - monthIndex
              const contribution = data[monthIndex - 1]?.contributions ?? 0
              const maxContributions = Math.max(...data.map(d => d.contributions), 1)
              const heightPercent = (contribution / maxContributions) * 80
              
              return (
                <div
                  key={`bar-${month}-${contribution}`}
                  className="absolute w-1 bg-primary rounded"
                  style={{ 
                    height: `${heightPercent}%`, 
                    left: `${(monthIndex - 1) * (width / 12)}px`,
                    bottom: '40px'
                  }}
                />
              )
            })}
          </div>
          
          <p className="mt-2 text-sm text-muted-foreground">
            Total contributions this year: {data.reduce((sum, d) => sum + d.contributions, 0)}
          </p>
        </div>
      </div>
    </div>
  )
}