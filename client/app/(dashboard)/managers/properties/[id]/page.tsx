"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    useGetPaymentsQuery,
    useGetPropertyLeasesQuery,
    useGetPropertyQuery,
} from "@/state/api";
import { ArrowDownToLine, ArrowLeft, Check, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const PropertyTenants = () => {
    const { id } = useParams();
    const propertyId = Number(id);

    const { data: property, isLoading: propertyLoading } =
        useGetPropertyQuery(propertyId);
    const { data: leases, isLoading: leasesLoading } =
        useGetPropertyLeasesQuery(propertyId);
    const { data: payments, isLoading: paymentsLoading } =
        useGetPaymentsQuery(propertyId);

    if (propertyLoading || leasesLoading || paymentsLoading) return <Loading />;

    const getCurrentMonthPaymentStatus = (leaseId: number) => {
        const currentDate = new Date();
        const currentMonthPayment = payments?.find(
            (payment) =>
                payment.leaseId === leaseId &&
                new Date(payment.dueDate).getMonth() === currentDate.getMonth() &&
                new Date(payment.dueDate).getFullYear() === currentDate.getFullYear()
        );
        return currentMonthPayment?.paymentStatus || "Not Paid";
    };

    return (
        <div className="dashboard-container">
            {/* Back to properties page */}
            <Link
                href="/managers/properties"
                className="flex items-center mb-4 hover:text-primary-500"
                scroll={false}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Properties</span>
            </Link>

            <Header
                title={property?.name || "My Property"}
                subtitle="Manage tenants and leases for this property"
            />

            <div className="w-full space-y-6">
                <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Tenants Overview</h2>
                            <p className="text-sm text-gray-500">
                                Manage and view all tenants for this property.
                            </p>
                        </div>
                        <div>
                            <button
                                className={`bg-white border border-gray-300 text-gray-700 py-2
              px-4 rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
                            >
                                <Download className="w-5 h-5 mr-2" />
                                <span>Download All</span>
                            </button>
                        </div>
                    </div>
                    <hr className="mt-4 mb-1" />
                    <div className="overflow-x-cover w-385">
                        {leases && leases.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tenant</TableHead>
                                        <TableHead>Lease Period</TableHead>
                                        <TableHead>Monthly Rent</TableHead>
                                        <TableHead>Current Month Status</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leases.map((lease) => (
                                        <TableRow key={lease.id} className="h-24">
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Image
                                                        src="/landing-i1.png"
                                                        alt={lease.tenant.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                    <div>
                                                        <div className="font-semibold">
                                                            {lease.tenant.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {lease.tenant.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    {new Date(lease.startDate).toLocaleDateString()} - {new Date(lease.endDate).toLocaleDateString()}
                                                </div>
                                               
                                            </TableCell>
                                            <TableCell>${lease.rent.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getCurrentMonthPaymentStatus(lease.id) === "Paid"
                                                            ? "bg-green-100 text-green-800 border-green-300"
                                                            : "bg-red-100 text-red-800 border-red-300"
                                                        }`}
                                                >
                                                    {getCurrentMonthPaymentStatus(lease.id) === "Paid" && (
                                                        <Check className="w-4 h-4 inline-block mr-1" />
                                                    )}
                                                    {getCurrentMonthPaymentStatus(lease.id)}
                                                </span>
                                            </TableCell>
                                            <TableCell>{lease.tenant.phoneNumber}</TableCell>
                                            <TableCell>
                                                <button
                                                    className={`border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex 
                          items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50`}
                                                >
                                                    <ArrowDownToLine className="w-4 h-4 mr-1" />
                                                    Download Agreement
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                                <div className="mb-4 p-3 bg-gray-100 rounded-full">
                                    <svg
                                        className="w-8 h-8 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20a9 9 0 0118 0v2h2v-2a11 11 0 10-20 0v2h2v-2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    No Tenants Yet
                                </h3>
                                <p className="text-gray-500 max-w-md mb-4">
                                    This property currently has no active tenants.
                                </p>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyTenants;