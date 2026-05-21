import Image from 'next/image'

interface LifestyleCollageProps {
  images: string[] // 4 image URLs
}

/** 2x2 atmospheric product photography grid — sits between sections like Afnan does. */
export default function LifestyleCollage({ images }: LifestyleCollageProps) {
  const four = images.slice(0, 4)
  if (four.length < 4) return null

  return (
    <section className="bg-white">
      <div className="grid grid-cols-2 gap-0">
        {four.map((src, i) => (
          <div key={src + i} className="relative aspect-[5/4] overflow-hidden">
            <Image
              src={src}
              alt={`Lifestyle ${i + 1}`}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
