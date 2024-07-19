import './App.css';
import {useState, useEffect} from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://elxaevmbzspqutbydiaj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVseGFldm1ienNwcXV0YnlkaWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4OTA0NTMsImV4cCI6MjAzNjQ2NjQ1M30.bWV3TfnCtUpgXP6_fVhDBCjoZwbMTKKx0Rar_uPmSBo')

const dbController = {}

    const getData = async () => {
        try{
        //  const { data, error } = await supabase.from("userTracker").select('*')
        let { data: userTracker, error } = await supabase
        .from('userTracker')
        .select('*')
        if(userTracker){
        setNames(userTracker[0].Name)
        }}catch(err){
        console.error(err)
        }
    }

    const addData = async () => {
        const { data, error } = await supabase
        .from('userTracker')
        .insert([
        { Name: 'someValue' },
        ])
        .select()
    }

    async function checkUser() {
        const {
        data: { user },
        } = await supabase.auth.getUser()
        let metadata = user.user_metadata
        setUser(metadata)
    }

    const signInWithGithub = async function (){
        await supabase.auth.signInWithOAuth({
        provider: 'github'
        })
    }

    dbController.signOut = async function(){
        await supabase.auth.signOut()
        setUser(null)    
    }

    module.exports = dbController;