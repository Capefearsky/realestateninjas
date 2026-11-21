import { NextResponse } from 'next/server';
export const go = (req, path) => NextResponse.redirect(new URL(path, req.url), 303);
