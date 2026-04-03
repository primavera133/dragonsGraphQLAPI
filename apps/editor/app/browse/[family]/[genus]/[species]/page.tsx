export default async function SpeciesPage({
  params,
}: {
  params: Promise<{ family: string; genus: string; species: string }>
}) {
  const { family, genus, species } = await params
  return (
    <div>
      <p className="muted">Species editor coming in Phase 3.</p>
      <p className="muted">Path: {family}/{genus}/{species}.json</p>
    </div>
  )
}
