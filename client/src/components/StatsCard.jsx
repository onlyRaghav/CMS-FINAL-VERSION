const StatsCard = ({ title, count, color }) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-700 border-red-300',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    green: 'bg-green-100 text-green-700 border-green-300',
  }

  return (
    <div className={`p-6 rounded-lg border-2 ${colorClasses[color]}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-4xl font-bold mt-2">{count}</p>
    </div>
  )
}

export default StatsCard
