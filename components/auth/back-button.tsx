import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

interface BackButtonProps{
    label:string;
    link:string
}
const BackButton = ({label,link}:BackButtonProps) => {
  return (
    <Button
    variant="link"
    >
        <Link href={link}>{label}</Link>
    </Button>
  )
}

export default BackButton