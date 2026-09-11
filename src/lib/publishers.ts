/**
 * Data-access helpers for publisher records used during build-time page generation.
 * These helpers read the local SQLite database through Drizzle and map the raw
 * rows to the app-facing Publisher shape consumed by Astro pages.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * 
 * Fetch all publishers ordered alphabetically by name.
 *
 * @param db - The Drizzle database instance to query.
 * @returns A list of publishers sorted by name for stable static builds.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    return db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));
}
