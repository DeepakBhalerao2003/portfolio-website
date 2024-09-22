"use client";
import { CopyPlus, Github, Instagram, Linkedin, MailCheckIcon, PhoneCallIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { toast, Toaster } from 'sonner';
import { Tooltip } from './ui/Tooltip';
import Image from 'next/image';

export const Contact = () => {
    const copyToClipboard = (text: string, type: string) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            // Use the Clipboard API if available
            navigator.clipboard.writeText(text)
                .then(() => {
                    toast(`${type} copied to clipboard!`);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    fallbackCopy(text, type); // Call fallback method if clipboard fails
                });
        } else {
            // Fallback method for unsupported environments
            fallbackCopy(text, type);
        }
    };

    const fallbackCopy = (text: string, type: string) => {
        // Create a temporary textarea element
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand("copy"); // Copy the text
            toast(`${type} copied to clipboard!`);
        } catch (err) {
            console.error('Fallback: Failed to copy: ', err);
        }
        document.body.removeChild(textArea); // Clean up
    };

    return (
        <div id="contact" className="py-16 lg:px-32 space-y-6 flex flex-col items-center">
            <div className="text-xl px-4 py-2 bg-gray-300 rounded-md w-fit mx-auto">Get in Touch</div>

            <div className='text-xl flex gap-2'>
                <MailCheckIcon aria-label="Email" />
                bhaleraod60@gmail.com
                <CopyPlus 
                    className="hover:scale-125 cursor-pointer hover:text-green-600 transition-all" 
                    onClick={() => copyToClipboard('bhaleraod60@gmail.com', 'Email')} 
                />
            </div>

            <div className='text-xl flex gap-2'>
                <PhoneCallIcon aria-label="Phone" />
                +91 9881075411
                <CopyPlus 
                    className="hover:scale-125 cursor-pointer hover:text-green-600 transition-all" 
                    onClick={() => copyToClipboard('+91 9881075411', 'Phone number')} 
                />
            </div>

            <div>
                <h2>Also Connect with me on</h2>
                <div className="flex gap-8 mt-4 items-center justify-center">
                    <div className="flex gap-8">
                        <Tooltip text="GitHub">
                            <Link href="https://github.com/DeepakBhalerao2003/" target="_blank" rel="noopener noreferrer">
                                <Github className="hover:scale-125 hover:bg-green-600 hover:text-white rounded-full px-2 w-10 h-10 transition-all" aria-label="GitHub" />
                            </Link>
                        </Tooltip>
                        <Tooltip text="LinkedIn">
                            <Link href="www.linkedin.com/in/deepak-bhalerao-a2344a239" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="hover:scale-125 hover:bg-green-600 hover:text-white rounded-full px-2 w-10 h-10 transition-all" aria-label="LinkedIn" />
                            </Link>
                        </Tooltip>
                        {/* <Tooltip text="Instagram">
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <Instagram className="hover:scale-125 hover:bg-green-600 hover:text-white rounded-full px-2 w-10 h-10 transition-all" aria-label="Instagram" />
                            </Link>
                        </Tooltip> */}
                        <Tooltip text="Hackerrank">
                            <Link href="www.linkedin.com/in/deepak-bhalerao-a2344a239" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="hackerrank-brands-solid.svg"
                                    width={20}
                                    height={20}
                                    alt='hackerrank'
                                    className='hover:scale-125 hover:bg-green-600 hover:text-white rounded-full px-2 w-10 h-10 transition-all'
                                />
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/* Toaster for notifications */}
            <Toaster />
        </div>
    );
};
