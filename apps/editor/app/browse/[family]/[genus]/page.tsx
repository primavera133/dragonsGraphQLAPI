export default async function GenusPage({
  params,
}: {
  params: Promise<{ family: string; genus: string }>
}) {
  const { family, genus } = await params
  return (
    <div>
      <p className="muted">Genus editor coming in Phase 3.</p>
      <p className="muted">Path: {family}/{genus}/about.json</p>
    </div>
  )
}
