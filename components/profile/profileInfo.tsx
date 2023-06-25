'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { updatePasswordActions } from '@/controller/actions/auth/profile/_changeInfo';

const ProfileInfoTabs = ({ session }: any) => {

    const [message, setMessage] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleSavePassword = async () => {
        if (passwordData.newPassword === passwordData.confirmNewPassword) {
            const { currentPassword, newPassword } = passwordData
            const passwordUpdate = await updatePasswordActions(currentPassword, newPassword, session)

            if (passwordUpdate?.error) {
                setMessage(null)
                setError(passwordUpdate?.error)
            }

            if (passwordUpdate?.message) {
                setError(null)
                setMessage(passwordUpdate?.message)
            }
        }
    };

    return (
        <Tabs defaultValue="account" className="w-[800px] mt-20 mx-auto flex flex-col items-center">
            <div className="mb-5 w-full">
                {error && (
                    <div className="text-center bg-red-100 text-red-500 py-2 px-4 rounded-lg mb-2">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="text-center bg-green-100 text-green-500 py-2 px-4 rounded-lg mb-2">
                        {message}
                    </div>
                )}
            </div>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" disabled defaultValue={`${session?.name}`} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Email</Label>
                            <Input id="username" disabled defaultValue={`${session?.email}`} />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="password" className="w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you&apos;ll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input
                                id="current"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        currentPassword: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input
                                id="new"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        newPassword: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirm">Confirm New password</Label>
                            <Input
                                id="confirm"
                                type="password"
                                value={passwordData.confirmNewPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        confirmNewPassword: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSavePassword}>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default ProfileInfoTabs;
