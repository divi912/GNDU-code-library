import MaterialCard from './MaterialCard.jsx'

export default function MaterialGrid({ materials }) {
  return (
    <div className="material-grid">
      {materials.map((material) => (
        <MaterialCard key={material.renderKey} material={material} />
      ))}
    </div>
  )
}
