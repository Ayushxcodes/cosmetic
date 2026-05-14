"use client";
import React, { useEffect, useRef, useState } from "react";

export default function MarqueeSection() {
	const content = "Clean Beauty · Cruelty Free · Sustainable · Vegan Formulas · Japanese Botanicals · Dermatologist Tested";
	const trackRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [offset, setOffset] = useState(0);
	const [items, setItems] = useState<string[]>([content, content]);
	const speed = 60; // pixels per second
	const loopsTarget = 0; // number of full cycles to run (0 = infinite)

	useEffect(() => {
		if (typeof window === "undefined") return;
		const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReduced) return;

		let rafId = 0;
		let lastTime: number | null = null;
		let totalShift = 0;
		let cycleWidth = 0;
		let running = true;

		const measureAndSetup = () => {
			const container = containerRef.current;
			const track = trackRef.current;
			if (!container || !track) return;

			const first = track.querySelector<HTMLDivElement>(".marquee-item");
			if (!first) return;
			const itemRect = first.getBoundingClientRect();
			const itemWidth = itemRect.width;
			const containerWidth = container.getBoundingClientRect().width;

			const repeatCount = Math.max(2, Math.ceil(containerWidth / itemWidth) + 1);
			const arr = Array.from({ length: repeatCount }, () => content);
			setItems(arr);

			cycleWidth = itemWidth * repeatCount;
			totalShift = 0;
			setOffset(0);
		};

		const step = (time: number) => {
			if (!running) return;
			if (lastTime == null) lastTime = time;
			const dt = (time - lastTime) / 1000;
			lastTime = time;

			if (cycleWidth === 0) {
				const first = trackRef.current?.querySelector<HTMLDivElement>(".marquee-item");
				if (first) {
					const rect = first.getBoundingClientRect();
					const containerWidth = containerRef.current?.getBoundingClientRect().width || 0;
					const repeatCount = Math.max(2, Math.ceil(containerWidth / rect.width) + 1);
					cycleWidth = rect.width * repeatCount;
				}
			}

			const delta = speed * dt;
			totalShift += delta;

			if (loopsTarget > 0 && cycleWidth > 0 && totalShift >= cycleWidth * loopsTarget) {
				running = false;
				const final = -((totalShift % cycleWidth) || 0);
				setOffset(final);
				return;
			}

			const next = - (totalShift % (cycleWidth || 1));
			setOffset(next);
			rafId = requestAnimationFrame(step);
		};

		measureAndSetup();
		rafId = requestAnimationFrame(step);
		const onResize = () => {
			cancelAnimationFrame(rafId);
			measureAndSetup();
			lastTime = null;
			rafId = requestAnimationFrame(step);
		};
		window.addEventListener("resize", onResize);

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<div className="w-full bg-transparent py-4">
			<div className="mx-auto  px-0">
				<div className="overflow-hidden" ref={containerRef}>
					<div
						ref={trackRef}
						className="flex items-center gap-8 whitespace-nowrap will-change-transform"
						style={{ transform: `translateX(${offset}px)` }}
					>
						{items.length === 0 ? (
							<div className="marquee-item text-sm text-[#6b5c44] uppercase tracking-wider">{content}</div>
						) : (
							items.map((c, idx) => (
								<div key={idx} className="marquee-item text-sm text-[#6b5c44] uppercase tracking-wider">{c}</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

